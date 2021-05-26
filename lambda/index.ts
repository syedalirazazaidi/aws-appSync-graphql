import * as AWS from "aws-sdk";

type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    msg: string;
    id: string;
    description: string;
  };
};
type Todo = {
  id: string;
  done: boolean;
  description: string;
};

async function addTodo(description: string): Promise<string | undefined> {
  const docClient = new AWS.DynamoDB.DocumentClient();
  const todoInput: Todo = {
    description,
  } as Todo;
  const params = {
    TableName: process.env.TodoTableName || "",
    Item: todoInput,
  };
  try {
    const response = await docClient.put(params).promise();
    return response.Attributes!["id"] || "";
  } catch (e) {
    console.info(e);
    return undefined;
  }
}
async function getTodo(
  id: string
): Promise<AWS.DynamoDB.ScanOutput | undefined> {
  const docClient = new AWS.DynamoDB.DocumentClient();
  const todoInput: Todo = {
    id,
  } as Todo;
  const params = {
    TableName: process.env.TodoTableName || "",
    Item: todoInput,
  };
  try {
    const todo = await docClient.scan(params).promise();
    return todo;
  } catch (e) {
    console.info(e);
    return undefined;
  }
}
export default addTodo;
exports.handler = async (event: AppSyncEvent) => {
  const notesArray = ["note1", "note2", "note3"];
  switch (event.info.fieldName) {
    case "notes":
      return notesArray;
    case "getTodo":
      return event.arguments.id;
    case "addTodo":
      return event.arguments.description;
    default:
      return null;
  }
};
