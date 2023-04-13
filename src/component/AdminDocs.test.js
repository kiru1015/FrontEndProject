import { render, screen } from "@testing-library/react";
import AdminDocs from "./AdminDocs";
import userEvent from "@testing-library/user-event";
import { fireEvent } from "@testing-library/react";
// import { mount } from 'enzyme';
// import { act } from "react-dom/test-utils";

test("it should have a folder", () => {
  const testData = [
    {
      type: "folder",
      name: "Expenses",
      children: [
        {
          type: "doc",
          name: "Expenses claim form",
          added: "2017-05-02"
        },
        {
          type: "doc",
          name: "Fuel allowances",
          added: "2017-05-03"
        },
      ],
    },
  ];
  render(<AdminDocs parent={testData} />);
  const type = screen.queryByText("folder");
  expect(type).toBeVisible();
});

test("it should have a folder with a name", () => {
    const testData = [
      {
        type: "folder",
        name: "Expenses Folder",
        children: [
          {
            type: "doc",
            name: "Expenses claim form",
            added: "2017-05-02"
          },
          {
            type: "doc",
            name: "Fuel allowances",
            added: "2017-05-03"
          },
        ],
      },
    ];
    render(<AdminDocs parent={testData} />);
    const type = screen.queryByText("Expenses Folder");
    expect(type).toBeVisible();
  });

test("it should have a file", () => {
  const testData = [
    {
      type: "pdf",
      name: "Employee Handbook",
      added: "2017-01-06"
    },
  ];
  render(<AdminDocs parent={testData} />);
  const type = screen.queryByText("pdf");
  expect(type).toBeVisible();
});

test("it should have a file with a Name", () => {
    const testData = [
      {
        type: "pdf",
        name: "Employee Handbook",
        added: "2017-01-06"
      },
    ];
    render(<AdminDocs parent={testData} />);
    const type = screen.queryByText("Employee Handbook");
    expect(type).toBeVisible();
  });

  test("it should have a file with time added", () => {
    const testData = [
      {
        type: "pdf",
        name: "Employee Handbook",
        added: "2017-01-06"
      },
    ];
    render(<AdminDocs parent={testData} />);
    const type = screen.queryByText("2017-01-06");
    expect(type).toBeVisible();
  });

test("it should allow user to open/expand a folder and view the files", async () => {
  const testData = [
    {
      type: "folder",
      name: "Expenses",
      children: [
        {
          type: "doc",
          name: "Expenses claim form",
          added: "2017-05-02"
        },
        {
          type: "doc",
          name: "Fuel allowances",
          added: "2017-05-03"
        },
      ],
    },
  ];
  render(<AdminDocs parent={testData} />);
  const expandButton = screen.getByText("Expand");
  await (() => userEvent.click(expandButton));
  await (() => expect(screen.queryByText("Expenses claim form")).toBeVisible());
});

test("it should allow user to close/collapse a folder", async () => {
  const testData = [
    {
      type: "folder",
      name: "Expenses",
      children: [
        {
          type: "doc",
          name: "Expenses claim form",
          added: "2017-05-02",
        },
        {
          type: "doc",
          name: "Fuel allowances",
          added: "2017-05-03"
        },
      ],
    },
  ];
  render(<AdminDocs parent={testData} />);
  const expandButton = screen.getByText("Expand");
  await (() => userEvent.click(expandButton));
  let collapseButton = "";
  await (() => (collapseButton = screen.getByText("Collapse")));
  await (() => userEvent.click(collapseButton));
  await (() => expect(screen.queryByText("Expenses claim form")).not.toBeVisible());
});

test("it should show files filtered by search", async () => {
    const testData = [
      {
        type: "folder",
        name: "Expenses",
        children: [
          {
            type: "doc",
            name: "Expenses claim form",
            added: "2017-05-02",
          },
          {
            type: "doc",
            name: "Fuel allowances",
            added: "2017-05-03"
          },
        ],
      },
    ];
    render(<AdminDocs parent={testData} />);
    const event = {
        preventDefault() {},
        target: { value: 'fuel' }
      };

      const input = screen.getByPlaceholderText(/search file/i);
    await(()=>fireEvent.change(input, { target: { value: "Fuel" } })); // onChange-event is fired!!!
    await(()=>expect(screen.queryByText("Expenses claim form")).toBeVisible());
    
  });
