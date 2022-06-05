export const generateSearchParams = ({
  pathname,
  server,
  characterid,
}: {
  pathname: string;
  server?: string | string[];
  characterid?: string | string[];
}) => {
  if (server && characterid) {
    return `${pathname}?server=${server}&characterid=${characterid}`;
  }
  return pathname;
};
