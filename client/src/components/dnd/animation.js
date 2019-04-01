// export const timings = {
//     outOfTheWay: 0.2,
//     // greater than the out of the way time
//     // so that when the drop ends everything will
//     // have to be out of the way
//     minDropTime: 0.33,
//     maxDropTime: 0.55,
//   };

//   export const curves = {
//     outOfTheWay: 'cubic-bezier(0.2, 0, 0, 1)',
//     drop: 'cubic-bezier(.2,1,.1,1)',
//   };

//   const outOfTheWayTiming = `${timings.outOfTheWay}s ${
//     curves.outOfTheWay
//   }`;

//   export const placeholderTransitionDelayTime: number = 0.1;
//   export const transitions = {
//     fluid: `opacity ${outOfTheWayTiming}`,
//     snap: `transform ${outOfTheWayTiming}, opacity ${outOfTheWayTiming}`,
//     drop: (duration: number): string => {
//       const timing: string = `${duration}s ${curves.drop}`;
//       return `transform ${timing}, opacity ${timing}`;
//     },
//     outOfTheWay: `transform ${outOfTheWayTiming}`,
//     placeholder: `height ${outOfTheWayTiming}, width ${outOfTheWayTiming}, margin ${outOfTheWayTiming}`,
//   };
  
//   const moveTo = (offset: Position): ?string =>
//     isEqual(offset, origin) ? null : `translate(${offset.x}px, ${offset.y}px)`;
  
//   export const transforms = {
//     moveTo,
//     drop: (offset: Position, isCombining: boolean) => {
//       const translate: ?string = moveTo(offset);
//       if (!translate) {
//         return null;
//       }
  
//       // only transforming the translate
//       if (!isCombining) {
//         return translate;
//       }
  
//       // when dropping while combining we also update the scale
//       return `${translate} scale(${combine.scale.drop})`;
//     },
//   };
  