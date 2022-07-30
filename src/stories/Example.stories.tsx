export default { title: "Application/Accordion" };
import {
  Accordion, AccordionGroup, AccordionHeader,
  Avatar,
  AvatarGroup,
  AvatarBadge,
  Bar,
  Checkbox,
  Tooltip,
  Radio,
  RadioGroup,
  Select,
  Breadcrumbs, Menu,
  MenuButton,
  MenuItem,
  MenuOptionGroup,
  MenuOption,
  MenuItemGroup,
  Message,
  Meter,
  BarProps,
  Modal,
  Button, ModalContent, ModalHeader, ModalBody, ModalFooter,
  Progress,
  Spinner,
  Tag,
  TagGroup,
  Tabs,
  Tab,
  TabContainer,
  TextField,
  Toast,
} from "solid-blocks";
import '../../node_modules/solid-blocks/dist/index.css'
import { createSignal } from "solid-js";

import { css, styled } from "solid-styled-components";

const BarStyle = css`
padding:2px ;
background-color:rgba(245, 245, 245, 0.589);
width:100% ;
`;
const BarItem = styled('div')`
padding-right: 4px;
  .otherClass {
    margin: 5px;
  }
`
const accordionPara = css`
padding:12px;
background-color:rgba(245, 245, 245, 0.589);

`;
import Img1 from '../../asserts/img1.svg'
import Img2 from '../../asserts/img2.svg'
// import './solid-blocks.css'
const HeaderAccordion = styled('summary')`
padding: 16px;
cursor:pointer;
border-bottom:1px solid lightgray ;

&:focus {
  box-shadow: rgb(0 174 239) 0px 0px 2px 2px;
}
transition: all 0.2s ease-out!important;

`;

const Box = styled('div')`
width: 170px;
    height: 200px;
padding: 16px;
cursor:pointer;
border-radius:8px ;
background-color: #dfdfdf14;
    box-shadow: rgb(213 213 213) 0px 0px 2px 2px;
    text-align: center;
    position: relative;
.button{
position:absolute ;
bottom: 8px;
    box-shadow: 0px 0px 3px 1px #dfdfdf14;
    padding: 5px 29px;
    border-radius: 6px;
    border: none;
    left: 12px;
}

`;

const HorizentalBox = styled('div')`
width: 400px;
    height: 200px;
cursor:pointer;
border-radius:5px ;
background-color: #dfdfdf14;
    box-shadow: rgb(213 213 213) 0px 0px 2px 2px;
    text-align: center;
    position: relative;
    display: flex;

.col-1{
  width: 140px;
  background-color:gray ;
  border-radius: 5px 0px 0px 5px;
}

`;
export const Accordions = () => {


  return <>
    <Accordion  >
      <HeaderAccordion  >Accordion First</HeaderAccordion>
      <p class={accordionPara}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum natus, incidunt, voluptatum ea delectus enim ut ullam, voluptate libero consectetur et esse pariatur fuga. Cumque exercitationem inventore voluptates assumenda quae?</p>
    </Accordion>
    <Accordion>
      <HeaderAccordion>Accordion Second</HeaderAccordion>
      <p class={accordionPara}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit perferendis nihil accusantium, magni aspernatur laudantium iusto aut, dignissimos pariatur voluptatem exercitationem deleniti. Alias beatae aliquam ad laudantium ratione quod vitae.</p>
    </Accordion>
  </>
}


export const AccordionGroups = () => {
  return <AccordionGroup >
    <Accordion>
      <HeaderAccordion>Accordion</HeaderAccordion>
      <p class={accordionPara}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum natus, incidunt, voluptatum ea delectus enim ut ullam, voluptate libero consectetur et esse pariatur fuga. Cumque exercitationem inventore voluptates assumenda quae?</p>
    </Accordion>
    <Accordion>
      <HeaderAccordion>Accordion</HeaderAccordion>
      <p class={accordionPara}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum natus, incidunt, voluptatum ea delectus enim ut ullam, voluptate libero consectetur et esse pariatur fuga. Cumque exercitationem inventore voluptates assumenda quae?</p>
    </Accordion>
    <Accordion>
      <HeaderAccordion>Accordion</HeaderAccordion>
      <p class={accordionPara}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum natus, incidunt, voluptatum ea delectus enim ut ullam, voluptate libero consectetur et esse pariatur fuga. Cumque exercitationem inventore voluptates assumenda quae?</p>
    </Accordion>
  </AccordionGroup>
}

export const Avatars = () => {

  return <Avatar >
    <img src={Img1} alt="Img1" aria-expanded="boolean" width={23} />
  </Avatar>
}

export const Boxs = () => {

  return <div class={css`display:flex; justify-content:space-evenly;`}>
    <Box >
      <img src={Img1} alt="Img1" aria-expanded="boolean" width={50} />
      <button class="button">Primary Button</button>

    </Box>
    <HorizentalBox >
      <div class="col-1"></div>
      <div class="col-2"></div>

    </HorizentalBox>
  </div>
}
export const AvatarGroups = () => {

  return <AvatarGroup >
    <Avatar >
      <img src={Img1} alt="Img1" aria-expanded="boolean" width={23} />
    </Avatar>
    <Avatar >
      <img src={Img1} alt="Img1" aria-expanded="boolean" width={23} />
    </Avatar>
    <Avatar >
      <img src={Img1} alt="Img1" aria-expanded="boolean" width={23} />
    </Avatar>
  </AvatarGroup>
}
export const Avatar_Badge = () => {

  return <AvatarBadge >
    <img src={Img1} alt="Img1" aria-expanded="boolean" width={23} />
  </AvatarBadge>
}
export const Bars = () => {

  return <Bar class={BarStyle} placement="top" portal={false} >
    <Avatar class={css`width:30px!important;`}>
      <img src={Img1} alt="Img1" />

    </Avatar>

    <BarItem>
      <a href="/" class="otherClass">Home</a>
      <a href="/" class="otherClass">About</a>
      <a href="/" class="otherClass">Contact Us</a>
    </BarItem>


  </Bar>
}
export const Breadcrumbss = () => {

  return <Breadcrumbs variant="primary" placement="top" position="relative" portal="true">
    <a href="/">Home</a>
    <a href="/docs">Docs</a>
    <span>Breadcrumbs</span>
  </Breadcrumbs>
}


export const Menus = () => {

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
      onchange={(value) => {/*…*/ }}
    >
      <MenuOption value="first">First radio option</MenuOption>
      <MenuOption value="second">Second radio option</MenuOption>
    </MenuOptionGroup>
    <MenuOptionGroup
      title="MenuOptionGroup type=checkbox"
      type="checkbox"
      onchange={(value) => {/*…*/ }}
    >
      <MenuOption value="first">First checkbox option</MenuOption>
      <MenuOption value="second">Second checkbox option</MenuOption>
    </MenuOptionGroup>
  </Menu>
}


export const Messages = () => {

  return <>
    <Message type="success">Success Message</Message>
    <Message type="info">Info Message</Message>
    <Message type="warning">Warning Message</Message>
    <Message type="error">Error Message</Message>
  </>
}
export const Meters = () => {
  const [count, setCount] = createSignal(0);
  setInterval(() => {
    if (count() === 100) {
      setCount(0)
    }
    setCount(Math.floor(Math.random() * 100))
  }, 80);

  return <Meter class="sb-meter" min={0} max={100} value={count()} />

}
export const Buttons = () => {

  return <>
    <Button variant="primary">Primary Button</Button>
    <Button variant="secondary">Secondary Button</Button>
    <Button variant="link">Link Button</Button>
    <Button variant="icon">Icon Button</Button>
  </>

}
export const CheckBoxs = () => {

  return <>
    <Checkbox >Success CheckBox</Checkbox>

    <Checkbox switch>Switch CheckBox</Checkbox>

  </>

}
export const Radios = () => {

  return <Radio >Success Message</Radio>

}
export const RadioGroups = () => {

  return <RadioGroup >
    <Radio >Success </Radio>
    <Radio >Danger</Radio>
  </RadioGroup>

}
export const Selects = () => {

  return <Select >
    <option>Option A</option>
    <option>Option B</option>

    <option>Option C</option>

  </Select>

}
export const Modals = () => {

  return <Modal closeOnClickOutside closeOnEsc>
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


export const Progresss = () => {
  const [count, setCount] = createSignal(0);
  setInterval(() => {
    if (count() === 100) {
      setCount(0)
    }
    setCount(count() + 1)
  }, 50);

  return <Progress max={100} value={count()} />

}

export const Spinners = () => {

  return <Spinner />

}

export const Single_Tag = () => {

  return <Tag>Unlinked tag</Tag>

}

export const GroundTag = () => {

  return <TagGroup>
    <Tag>JavaScript</Tag>
    <Tag>JavaScript</Tag>

    <Tag>JavaScript</Tag>
    <Tag>JavaScript</Tag>

    <Tag href="https://solidjs.com" target="_blank">SolidJS</Tag>
    <Tag href="https://typescriptlang.org" target="_blank">TypeScript</Tag>
  </TagGroup>

}
export const Single_Tab = () => {

  return <Tab>Unlinked taB</Tab>

}
export const Group_Tab = () => {

  return <Tabs>
    <Tab>First Tab</Tab>
    <Tab>Second Tab</Tab>
    <Tab>Third Tab</Tab>
  </Tabs>

}
export const Tab_Container = () => {

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
let types = ['text', 'color', 'date', 'datetime-local', 'email', 'file', 'month', 'number', 'password', 'range', 'search', 'submit', 'tel', 'time', 'url', 'week']
export const Text_Field = () => {

  return <>
    {types.map(e => <>
      <TextField aria-orientation="vertical" type={e}>{e}</TextField>
    </>)}
  </>

}
export const Tooltip_Field = () => {

  return <Tooltip trigger="hover" content="i am Tooltip">Hello TEst</Tooltip>

}
export const Toasts = () => {

  return <Toast
    position="bottom-left"
    timeout={0}
  >{({ hide }) =>
    <Message type="info">
      <Button style={{ float: "right" }} variant="icon" onclick={hide}>✕</Button>
      {"Toast content"}
    </Message>
    }</Toast>

}