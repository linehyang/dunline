import { useRouter } from "next/router";

function Setting() {
  const router = useRouter();
  const { query } = router;
  console.log(query);
  return <div>adsf</div>;
}

export default Setting;
