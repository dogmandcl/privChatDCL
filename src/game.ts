import { initiateVJUI } from './privateChat'

initiateVJUI().catch((error) => log(error))

// ground
const bermudaGrass = new Entity('bermudaGrass')
bermudaGrass.addComponentOrReplace(
  new GLTFShape('models/FloorBaseGrass_01/FloorBaseGrass_01.glb')
)
bermudaGrass.addComponentOrReplace(
  new Transform({
    position: new Vector3(8, 0, 8),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  })
)
engine.addEntity(bermudaGrass)

// building
const shopEmissive = new Entity('shopEmissive')
shopEmissive.addComponentOrReplace(
  new Transform({
    position: new Vector3(9.5, 0, 8),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  })
)
shopEmissive.addComponentOrReplace(new GLTFShape('models/Shop_Emissive.glb'))
engine.addEntity(shopEmissive)
