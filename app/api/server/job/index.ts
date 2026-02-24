'use server';

export const getJobListServer = async (offset = 0, query = '', limit = 20) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/navigation/v1/results?1765229525360=&job_group_id=518&job_ids=669&country=kr&years=0&locations=all&offset=${offset}&query=${query}&limit=${limit}`,
      {
        cache: 'no-store',
      }
    );

    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error(err);
  }
};
