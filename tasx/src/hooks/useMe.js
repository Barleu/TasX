import { useDocumentData } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { firestore } from "../firebase/config";

function useMe() {
  const [user] = useAuthState(auth);

  const roleRef = firestore.doc(`/users/${user?.uid || 0}`);
  const [me] = useDocumentData(roleRef, { idField: "id" });

  if (!me) return {};
  return me;
}

export default useMe;
