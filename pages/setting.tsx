import Head from "next/head";
import { useRouter } from "next/router";

import UserEquipInfo from "../components/Setting/UserEquipInfo";
import AcquireEpicConcept from "../components/Setting/AcquireEpicConcept";

function Setting() {
  const router = useRouter();
  const { query } = router;
  const { server, characterid } = query;

  return (
    <>
      <Head>
        <title>DUNLINE</title>
      </Head>
      <main>
        <UserEquipInfo server={server} characterid={characterid} />
        <AcquireEpicConcept server={server} characterid={characterid} />
      </main>
    </>
  );
}

export default Setting;
