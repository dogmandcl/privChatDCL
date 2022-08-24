import * as ui from '@dcl/ui-scene-utils'
import { getUserData, UserData } from '@decentraland/Identity'
import { isPreviewMode } from '@decentraland/EnvironmentAPI'



export let userData: UserData

export async function fetchUserData() {
  const data = await getUserData()
  if (data) {
    log(data.displayName)
  }
  return data
}

export async function setUserData() {
  const data = await getUserData()
  if (data) {
    log(data.displayName)
    userData = data
  }
}

export const allowListedIds = ['SceneAdmin', 'Doggo', 'tangpoko']

export const sceneMessageBus = new MessageBus()

let announceUI: ui.FillInPrompt


export async function initiateVJUI() {
  if (!userData) {
    await setUserData()
  }

  let authorized = false

  if (await isPreviewMode()) {
    authorized = true
  } else {
    for (const id of allowListedIds) {
      if (userData && id === userData.displayName) {
        authorized = true
        break
      }
    }
  }

  if (authorized) {
    announceUI = new ui.FillInPrompt(
      'Private Chat',
      (e: string) => {
        sceneMessageBus.emit('privChat', {
          text: e
        })
      },
      'Send',
      '',
      true,

    )
    announceUI.hide()
    
    myText.visible= true



 
    Input.instance.subscribe(
      'BUTTON_DOWN',
      ActionButton.PRIMARY,
      false,
      (e) => {
        if (announceUI) {
          if (!announceUI.background.visible) {
            inventoryContainer.visible=true
            myText.visible = true
            announceUI.show()
          } else {
            announceUI.hide()
            inventoryContainer.visible= false
            myText.visible = false
          }
        }
      }
    )
  }
}



sceneMessageBus.on('privChat', (e) => {
 
myText.value = (e.text)

 
})




const canvas = new UICanvas()

const inventoryContainer = new UIContainerStack(canvas)
inventoryContainer.adaptWidth = true
inventoryContainer.width = "20%"
inventoryContainer.height = "40%"
inventoryContainer.positionY = 50
inventoryContainer.positionX = -100
inventoryContainer.color = Color4.White()
inventoryContainer.hAlign = "right"
inventoryContainer.vAlign = "bottom"
inventoryContainer.stackOrientation = UIStackOrientation.VERTICAL
inventoryContainer.visible = false




const myText = new UIText(canvas)
myText.value = ""
myText.font = new Font(Fonts.SansSerif)
myText.fontSize = 20
myText.positionX = "300px"
myText.positionY = "-210px"
myText.color = Color4.Blue()