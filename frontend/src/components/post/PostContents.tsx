const PostContents = ({
  contents,
  styles,
}: {
  contents: string;
  styles?: string;
}) => {
  return <span className={styles}>{contents}</span>;
};

export default PostContents;
