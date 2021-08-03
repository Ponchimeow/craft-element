import { useNode, UserComponent } from "@craftjs/core";
import { Button as AntdButton, Checkbox, Form, Input } from "antd";
import Collapse, { CollapseProps } from "antd/lib/collapse";
import { useForm } from "antd/lib/form/Form";
import styled from "styled-components";
import Button from "./Button";

const StyledUnderLineInput = styled(Input)`
  border-color: #d8d8d8;
  border-style: solid;
  border-top-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 1px;
  border-left-width: 0px;
  :hover {
    border-right-width: 0px !important;
    border-color: #d8d8d8;
  }
`;
const StyledSettingButtonWrapper = styled.div`
  position: absolute;
  top: 0.5em;
  right: 0.5em;
`;
const StyledCraftSettingLabel = styled.span`
  color: var(--gray-dark);
  font-size: 14px;
  letter-spacing: 0.4px;
  font-weight: 500;
`;
const StyledCollapsePanel = styled(Collapse.Panel)`
  .ant-collapse-header {
    padding-left: 0px !important;
  }
  .ant-collapse-content-box {
    padding: 0px !important;
  }
`;
const AdminHeaderTitle = styled.div`
  flex-grow: 1;
  color: var(--gray-darker);
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0.2px;
`;

const StyledButtonWrapper = styled.div<{ block: boolean; variant: string }>`
  display: ${(props) => (props.block ? "block" : "inline-block")};
  background-color: ${(props) =>
    props.variant === "solid" ? props.theme["@primary-color"] : ""};
  text-align: center;
`;

type CraftButtonProps = {
  title: string;
  link: string;
  openNewTab: boolean;
  size: "sm" | "md" | "lg";
  block: boolean;
  variant: "text" | "solid" | "outline";
  color: string;
};

type FieldProps = {
  title: string;
  link: string;
  openNewTab: boolean;
  size: "sm" | "md" | "lg";
  block: boolean;
  variant: "text" | "solid" | "outline";
  color: string;
};

const CraftButton: UserComponent<
  CraftButtonProps & {
    setActiveKey: React.Dispatch<React.SetStateAction<string>>;
  }
> = ({ title, size, block, variant, color, setActiveKey, children }) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <StyledButtonWrapper
      ref={(ref) => ref && connect(drag(ref))}
      block={block}
      variant={variant}
      style={{ cursor: "pointer", background: `${color}` }}
      onClick={() => setActiveKey("settings")}
    >
      <Button size={size} block={block}>
        {title}
      </Button>
    </StyledButtonWrapper>
  );
};

const ButtonSetting: React.VFC<CollapseProps> = ({ ...collapseProps }) => {
  const [form] = useForm<FieldProps>();
  const {
    actions: { setProp },
    props,
    selected,
  } = useNode((node) => ({
    props: node.data.props as CraftButtonProps,
    selected: node.events.selected,
  }));

  const handleSubmit = (values: FieldProps) => {
    setProp((props: CraftButtonProps) => {
      props.title = values.title;
      props.link = values.link;
      props.openNewTab = values.openNewTab;
      props.size = values.size;
      props.block = values.block;
      props.variant = values.variant;
      props.color = values.color;
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      colon={false}
      requiredMark={false}
      initialValues={{
        title: props.title || "",
        link: props.link || "",
        openNewTab: props.openNewTab || false,
        size: props.size || "md",
        block: props.block || false,
        variant: props.variant || "solid",
        color: props.color || "#585858",
      }}
      onFinish={handleSubmit}
    >
      <Collapse
        {...collapseProps}
        className="mt-2 p-0"
        bordered={false}
        expandIconPosition="right"
        ghost
        defaultActiveKey={["buttonSetting"]}
      >
        <StyledCollapsePanel
          key="buttonSetting"
          header={<AdminHeaderTitle>按鈕設定</AdminHeaderTitle>}
        >
          <Form.Item
            name="title"
            label={<StyledCraftSettingLabel>標題</StyledCraftSettingLabel>}
          >
            <Input className="mt-2" value={props.title} />
          </Form.Item>

          <Form.Item
            className="m-0"
            name="link"
            label={<StyledCraftSettingLabel>連結</StyledCraftSettingLabel>}
          >
            <StyledUnderLineInput className="mb-2" placeholder="https://" />
          </Form.Item>
          <Form.Item name="openNewTab" valuePropName="checked">
            <Checkbox>開新分頁</Checkbox>
          </Form.Item>
        </StyledCollapsePanel>
      </Collapse>

      {selected && (
        <StyledSettingButtonWrapper>
          <AntdButton className="mb-3" type="primary" block htmlType="submit">
            存擋
          </AntdButton>
        </StyledSettingButtonWrapper>
      )}
    </Form>
  );
};

CraftButton.craft = {
  related: {
    settings: ButtonSetting,
  },
  custom: {
    button: {
      label: "deleteBlock",
    },
  },
};

export default CraftButton;
