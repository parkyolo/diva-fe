const PostContent = ({
  content,
  styles,
}: {
  content: string;
  styles?: string;
}) => {
  return <span className={styles}>{content}</span>;
};

export default PostContent;
