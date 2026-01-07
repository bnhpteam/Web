// "use client";
// import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
// export default function RivePlayer({ code = "H1" }) {
//     const stateMachineName = "State Machine 1"; // 官网 State Machine 名字
//     const { rive, RiveComponent } = useRive({
//         src: `/assets/rive/${code}.riv`,
//         stateMachines: stateMachineName,
//         autoplay: true,
//     });
//     return (
//         <RiveComponent style={{ width: "100%", height: "100%" }} />
//     );
// }

"use client";
import { useRive } from "@rive-app/react-webgl2";

export default function RivePlayer({ code = "H1" }) {
  const stateMachineName = "State Machine 1";
  const { RiveComponent } = useRive({
    src: `/assets/rive/${code}.riv`,
    stateMachines: stateMachineName,
    autoplay: true,
  });

  return <RiveComponent style={{ width: "100%", height: "100%" }} />;
}
