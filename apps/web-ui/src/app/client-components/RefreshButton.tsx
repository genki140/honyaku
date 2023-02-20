'use client';

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const RefreshButton = () => {
  const router = useRouter();
  return <Button onClick={() => { router.refresh() }}>Reload</Button>;
}
export default RefreshButton;