import { HollowPrism } from "../../utils/prism_generator_utils.js"

/** Langsung dibikin dari generatornya */
let pentagonalPrismObject = new HollowPrism(5, 0.5, 0.5, 0.05);
// pentagonalPrismObject.log();
export const pentagonalPrism = pentagonalPrismObject.indices;
