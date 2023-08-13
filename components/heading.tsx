interface HeadingProps {
  title: string;
  description: string;
}

export const Heading = ({ description, title }: HeadingProps) => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-white">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
};
