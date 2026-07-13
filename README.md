# IWant

> 기술 스택을 기반으로 기여하기 좋은 GitHub 오픈소스 레포지토리를 추천하고, README, 기여 가이드, 이슈, 기술 매칭 정보를 한곳에서 확인할 수 있는 서비스

배포 URL: https://i-want-flame.vercel.app

---

## 프로젝트 소개

오픈소스 기여를 시작하려면 내 기술 스택과 맞는 레포를 찾고, README와 CONTRIBUTING 문서, 열린 이슈를 직접 확인해야 합니다. 이 과정은 검색 조건을 매번 조합해야 하고, 어떤 레포가 나에게 적합한지 판단하기 어렵습니다.

IWant는 사용자가 등록한 기술 스택 또는 검색 유입 URL의 기술 키워드를 기준으로 GitHub 레포를 조회합니다. 레포 상세 페이지에서는 README, 기여 가이드, 열린 이슈, 내 기술 스택과 레포 기술 키워드의 매칭 정보를 함께 보여줍니다.

---

## 주요 기능

- 기술 스택 기반 레포 추천
  - 로그인 사용자의 프로필에 저장된 기술 스택을 기준으로 GitHub 레포를 추천합니다.
  - `good-first-issues:>0`, `archived:false`, `is:public` 조건을 적용해 기여 가능성이 높은 공개 레포를 우선 조회합니다.

- 기술별 검색 유입 페이지
  - `/ko/search/react`, `/en/search/typescript`처럼 기술 스택별 URL을 제공합니다.
  - 검색 엔진 유입 사용자는 URL의 기술 키워드에 맞는 레포 목록을 바로 볼 수 있습니다.

- 레포 상세 정보
  - GitHub Repository API를 통해 README, CONTRIBUTING 문서, 열린 이슈를 조회합니다.
  - README/CONTRIBUTING 문서는 Markdown으로 렌더링하고, HTML은 sanitize 처리합니다.
  - Google Translate API를 통해 README와 기여 가이드를 한국어/영어로 번역할 수 있습니다.

- 기술 매칭 분석
  - 레포의 언어, 토픽, README 내용을 기반으로 기술 키워드를 추출합니다.
  - 사용자의 기술 스택과 비교해 매칭된 기술, 부족한 기술, 매칭률을 표시합니다.

- 북마크
  - 로그인 사용자는 관심 있는 레포를 북마크할 수 있습니다.
  - 북마크 목록은 DB에 저장되며, 레포 카드에서 즉시 추가/삭제할 수 있습니다.

- 다국어 SEO
  - `/ko`, `/en` locale 라우트를 제공합니다.
  - `canonical`, `hreflang`, sitemap, robots 설정으로 한국어/영어 검색 유입을 분리합니다.

- 보안 기본값
  - CSP, HSTS, X-Frame-Options, Referrer-Policy 등 전역 보안 헤더를 적용했습니다.
  - 변경 API에는 `Origin`, `Referer`, `Sec-Fetch-Site` 기반 CSRF 검증을 적용했습니다.
  - 외부 이미지는 GitHub avatar 도메인만 허용합니다.

---

## 기술 스택

| 분류 | 기술 |
| --- | --- |
| Framework | Next.js 16 App Router |
| Language | TypeScript |
| UI | React 19, Tailwind CSS 4 |
| Auth | NextAuth.js, Kakao OAuth |
| Database | PostgreSQL, Prisma |
| External API | GitHub REST API, Google Translate API |
| SEO | Next Metadata API, sitemap, robots, hreflang |
| Test | Jest, Testing Library |
| Deploy | Vercel |

---

## 핵심 구현

### Server Component 기반 초기 데이터 로딩

홈 화면은 서버에서 로그인 세션, 사용자 프로필, 북마크, 초기 레포 목록을 미리 조회한 뒤 클라이언트 컴포넌트에 전달합니다. 사용자가 기술 스택을 저장해 둔 경우, 첫 화면부터 개인화된 추천 레포를 볼 수 있습니다.

### 검색 유입과 개인화 추천 분리

검색 엔진에서 유입되는 사용자는 `/[locale]/search/[skill]` URL의 기술 키워드로 레포를 조회합니다. 반면 로그인 사용자의 홈 추천은 DB에 저장된 프로필 기술 스택을 기반으로 동작합니다. 두 흐름을 분리해 SEO와 개인화 추천을 각각 최적화했습니다.

### GitHub API 호출 구조

초기 목록은 서버에서 GitHub API를 호출하고, 무한 스크롤로 추가 목록을 불러올 때는 `/api/repos` Route Handler를 통해 같은 검색 조건을 이어갑니다. GitHub API 요청에는 선택적으로 `GITHUB_TOKEN` 또는 `GITHUB_ACCESS_TOKEN`을 사용해 rate limit 대응이 가능하도록 했습니다.

### 레포 상세 페이지 메타데이터

레포 상세 페이지는 GitHub repository id를 기반으로 동적 메타데이터를 생성합니다. 레포 이름, 설명, 언어, 토픽, 열린 이슈 수를 title/description/open graph에 반영해 검색 결과와 공유 미리보기 품질을 높였습니다.

### Markdown 렌더링 보안

GitHub README와 CONTRIBUTING 문서는 외부 Markdown 데이터입니다. `react-markdown`, `remark-gfm`, `rehype-raw`, `rehype-sanitize`를 조합해 GitHub 문서 표현력을 유지하면서 XSS 위험을 줄였습니다.

---

## 주요 라우트

| 경로 | 설명 |
| --- | --- |
| `/ko`, `/en` | locale별 홈, 기술 스택 기반 추천 레포 목록 |
| `/ko/search/[skill]`, `/en/search/[skill]` | 기술별 검색 유입 페이지 |
| `/ko/repo/[repoId]`, `/en/repo/[repoId]` | 레포 상세, README, 이슈, 기여 가이드 |
| `/ko/mypage`, `/en/mypage` | 사용자 이름과 기술 스택 관리 |
| `/ko/bookmark`, `/en/bookmark` | 북마크한 레포 목록 |
| `/sitemap.xml` | locale/기술별 공개 URL sitemap |
| `/robots.txt` | 검색 엔진 크롤링 정책 |

---

## 품질 관리

```bash
npx tsc --noEmit
npm test -- --runInBand
npm run build
```

현재 테스트 범위:

- i18n locale path, `hreflang` URL 생성
- 기술 스택 검색 slug/label 변환
- GitHub 검색 쿼리 생성
- 기술 매칭률 계산
- CSRF 요청 검증

---

## 로컬 실행

```bash
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

브라우저에서 `http://localhost:3000`으로 접속합니다.

### 환경변수

`.env.local`에 다음 값을 설정합니다.

```bash
DATABASE_URL=
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=
KAKAO_CLIENT_ID=
KAKAO_CLIENT_SECRET=
GITHUB_TOKEN=
GOOGLE_TRANSLATE_API_KEY=
```

`GITHUB_TOKEN`은 선택값이지만, 설정하면 GitHub API rate limit 대응에 유리합니다. `GOOGLE_TRANSLATE_API_KEY`는 레포 상세의 번역 기능을 사용할 때 필요합니다.

---

## 배포 시 확인 사항

- Vercel 환경변수에 `DATABASE_URL`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, Kakao OAuth 키를 등록합니다.
- 번역 기능을 배포 환경에서 사용할 경우 `GOOGLE_TRANSLATE_API_KEY`를 등록합니다.
- 배포 도메인이 바뀌면 `NEXTAUTH_URL`을 실제 도메인으로 설정해야 sitemap, canonical, OAuth callback URL이 올바르게 생성됩니다.
- Prisma schema가 변경된 경우 배포 DB에 migration을 적용합니다.
