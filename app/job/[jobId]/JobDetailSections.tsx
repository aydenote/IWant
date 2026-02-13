import { ProfileResponse } from '../../(types)/apis';

interface JobDetailSectionsProps {
  sections: {
    title: string;
    content: string;
  }[];
}

const JobDetailSections = ({ sections }: JobDetailSectionsProps) => (
  <div className="space-y-6">
    {sections.map((section) => (
      <div className="space-y-2" key={section.title}>
        <h2 className="text-xl font-semibold">{section.title}</h2>
        <div className="prose prose-sm text-foreground/90 whitespace-pre-line">
          {section.content}
        </div>
      </div>
    ))}
  </div>
);

export default JobDetailSections;
