export default { title: "Application/Accordion" };
import { Accordion, AccordionGroup,AccordionHeader,
  Avatar,
  AvatarGroup,
  AvatarBadge,
  Bar,
  Checkbox,
  Tooltip,
  Radio ,
   RadioGroup,
   Select,
  Breadcrumbs,Menu,
  MenuButton,
  MenuItem,
  MenuOptionGroup,
  MenuOption,
  MenuItemGroup,
  Message,
  Meter,
  Modal,
  Button,ModalContent,ModalHeader,ModalBody,ModalFooter,
  Progress,
  Spinner,
  Tag,
  TagGroup,
  Tabs ,
  Tab , 
  TabContainer,
  TextField,
  Toast ,
} from "solid-blocks";
import '../../node_modules/solid-blocks/dist/index.css'


import Img1 from '../../asserts/img1.svg'
import Img2 from '../../asserts/img2.svg'

export const Accordions=()=>{
    return <Accordion>
    <AccordionHeader>Accordion</AccordionHeader>
    <p>Hidden</p>
  </Accordion>
}


export const AccordionGroups=()=>{
  return <AccordionGroup >
  <Accordion>
    <AccordionHeader>Accordion</AccordionHeader>
    <p>Hidden</p>
  </Accordion>
  <Accordion>
    <AccordionHeader>Accordion</AccordionHeader>
    <p>Hidden</p>
  </Accordion>
  <Accordion>
    <AccordionHeader>Accordion</AccordionHeader>
    <p>Hidden</p>
  </Accordion>
</AccordionGroup>
}

export const Avatars=()=>{
  
  return <Avatar >
    <img src={Img1} alt="Img1" aria-expanded="boolean" width={23}/>
</Avatar>
}
export const AvatarGroups=()=>{
  
  return <AvatarGroup >
   <Avatar >
    <img src={Img1} alt="Img1" aria-expanded="boolean" width={23}/>
</Avatar>
<Avatar >
    <img src={Img1} alt="Img1" aria-expanded="boolean" width={23}/>
</Avatar>
<Avatar >
    <img src={Img1} alt="Img1" aria-expanded="boolean" width={23}/>
</Avatar>
</AvatarGroup>
}
export const Avatar_Badge=()=>{
  
  return <AvatarBadge >
    <img src={Img1} alt="Img1" aria-expanded="boolean" width={23}/>
</AvatarBadge>
}
export const Bars=()=>{
  
  return <Bar >
    Menu Bar
</Bar>
}
export const Breadcrumbss=()=>{

  return <Breadcrumbs   variant="primary" placement="top" position="relative" portal="true">
     <a href="/">Home</a>
  <a href="/docs">Docs</a>
  <span>Breadcrumbs</span>
</Breadcrumbs>
}


export const Menus=()=>{

  return <Menu align="left">
  <MenuButton variant="icon">☰</MenuButton>
  <MenuItem>Item outside MenuItemGroup</MenuItem>
  <hr />
  <MenuItem>Item after a &lt;hr/&gt;</MenuItem>
  <MenuItemGroup>
    <MenuItem>inside a MenuItemGroup</MenuItem>
    <MenuItem>without a title</MenuItem>
  </MenuItemGroup>
  <MenuItemGroup title="Another MenuItemGroup">
    <MenuItem>with a title</MenuItem>
  </MenuItemGroup>
  <MenuOptionGroup
    title="MenuOptionGroup type=radio"
    onchange={(value) =>  {/*…*/}}
  >
    <MenuOption value="first">First radio option</MenuOption>
    <MenuOption value="second">Second radio option</MenuOption>
  </MenuOptionGroup>
  <MenuOptionGroup
    title="MenuOptionGroup type=checkbox"
    type="checkbox"
    onchange={(value) => {/*…*/}}
  >
    <MenuOption value="first">First checkbox option</MenuOption>
    <MenuOption value="second">Second checkbox option</MenuOption>
  </MenuOptionGroup>
</Menu>
}


export const Messages=()=>{

  return <>
 <Message type="success">Success Message</Message>
<Message type="info">Info Message</Message>
<Message type="warning">Warning Message</Message>
<Message type="error">Error Message</Message>
</>
}
export const Meters=()=>{

  return  <Meter class="sb-meter" min={0} max={100} value={40}>Success Message</Meter>

}
export const Buttons=()=>{

  return  <>
  <Button variant="primary">Primary Button</Button>
  <Button variant="secondary">Secondary Button</Button>
  <Button variant="link">Link Button</Button>
  <Button variant="icon">Icon Button</Button>
  </>

}
export const CheckBoxs=()=>{

  return  <Checkbox >Success Message</Checkbox>

}
export const Radios=()=>{

  return  <Radio >Success Message</Radio>

}
export const RadioGroups=()=>{

  return  <RadioGroup >
    <Radio >Success </Radio>
    <Radio >Danger</Radio>
  </RadioGroup>

}
export const Selects=()=>{

  return  <Select>
    <option>Option A</option>
    <option>Option B</option>

    <option>Option C</option>

  </Select>

}
export const Modals=()=>{

  return  <Modal closeOnClickOutside closeOnEsc>
  {({ open, toggle }) => (
    <>
      <Button
        aria-disabled={open()}
        style={{ margin: "auto" }}
        onclick={toggle}
      >Press to open</Button>
      <ModalContent>
        <ModalHeader>
          Header
          <Button
            variant="icon"
            onclick={toggle}
            style={{ float: "right" }}
          >
            ✕
          </Button>
        </ModalHeader>
        <ModalBody>
          <p>
            Body of the Modal. You can fill it with whatever content.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button onclick={toggle}>OK</Button>
        </ModalFooter>
      </ModalContent>
    </>
  )}
  </Modal>

}


export const Progresss=()=>{

  return  <Progress  max={100} value={40}/>

}

export const Spinners=()=>{

  return  <Spinner />

}

export const Single_Tag=()=>{

  return <Tag>Unlinked tag</Tag>

}

export const GroundTag=()=>{

  return <TagGroup>
  <Tag>JavaScript</Tag>
  <Tag href="https://solidjs.com" target="_blank">SolidJS</Tag>
  <Tag href="https://typescriptlang.org" target="_blank">TypeScript</Tag>
</TagGroup>

}
export const Single_Tab=()=>{

  return <Tab>Unlinked taB</Tab>

}
export const Group_Tab=()=>{

  return <Tabs>
    <Tab>First Tab</Tab>
    <Tab>Second Tab</Tab>
    <Tab>Third Tab</Tab>
  </Tabs>

}
export const Tab_Container=()=>{

  return <TabContainer>
    <Tabs>
    <Tab>First Tab</Tab>
    <Tab>Second Tab</Tab>
    <Tab>Third Tab</Tab>
  </Tabs>
  <Tabs>
    <Tab>First Tab</Tab>
    <Tab>Second Tab</Tab>
    <Tab>Third Tab</Tab>
  </Tabs>
  </TabContainer>

}
let types=['text', 'color', 'date', 'datetime-local', 'email', 'file', 'month', 'number', 'password', 'range', 'search', 'submit', 'tel', 'time', 'url', 'week']
export const Text_Field=()=>{

  return <>
  {types.map(e=><>
    <TextField aria-orientation="vertical"  type={e}>{e}</TextField>
  </>)}
  </>

}
export const Tooltip_Field=()=>{

  return <Tooltip trigger="hover" content="i am Tooltip">Hello TEst</Tooltip>

}
export const Toasts=()=>{

  return <Toast 
  position="bottom-left"
  timeout={0}
>{({hide}) => 
  <Message type="info">
    <Button style={{float: "right"}} variant="icon" onclick={hide}>✕</Button>
    {"Toast content"}
  </Message>
}</Toast>

}