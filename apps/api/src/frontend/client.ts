type GetV1Input = {};

type GetV1Response = {
    status: "success";
    data: {
        status: string;
    };
} | {
    status: "error";
    error: {
        message: string;
    };
};

type GetV1UsersInput = {} & {};

type GetV1UsersResponse = {
    status: "success";
    data: {
        items: {
            id: string;
            name: string;
        }[];
        totalItems: number;
    };
} | {
    status: "error";
    error: {
        message: string;
    };
};

type GetV1UsersIdInput = {} & {
    id: string;
};

type GetV1UsersIdResponse = {
    status: "success";
    data: {
        id: string;
        name: string;
    };
} | {
    status: "error";
    error: {
        message: string;
    };
};

export type Path = "/v1" | "/v1/users" | "/v1/users/:id";

export type Method = "get" | "post" | "put" | "delete" | "patch";

export type MethodPath = `${Method} ${Path}`;

export interface Input extends Record<MethodPath, any> {
    "get /v1": GetV1Input;
    "get /v1/users": GetV1UsersInput;
    "get /v1/users/:id": GetV1UsersIdInput;
}

export interface Response extends Record<MethodPath, any> {
    "get /v1": GetV1Response;
    "get /v1/users": GetV1UsersResponse;
    "get /v1/users/:id": GetV1UsersIdResponse;
}

export const jsonEndpoints = { "get /v1": true, "get /v1/users": true, "get /v1/users/:id": true };

export type Provider = <M extends Method, P extends Path>(method: M, path: P, params: Input[`${M} ${P}`]) => Promise<Response[`${M} ${P}`]>;

export type Implementation = (method: Method, path: string, params: Record<string, any>) => Promise<any>;

/*
export const exampleImplementation: Implementation = async (
  method,
  path,
  params
) => {
  const searchParams =
    method === "get" ? `?${new URLSearchParams(params)}` : "";
  const response = await fetch(`https://example.com${path}${searchParams}`, {
    method: method.toUpperCase(),
    headers:
      method === "get" ? undefined : { "Content-Type": "application/json" },
    body: method === "get" ? undefined : JSON.stringify(params),
  });
  if (`${method} ${path}` in jsonEndpoints) {
    return response.json();
  }
  return response.text();
};

const client = new ExpressZodAPIClient(exampleImplementation);
client.provide("get", "/v1/user/retrieve", { id: "10" });
*/
export class ExpressZodAPIClient {
    constructor(protected readonly implementation: Implementation) { }
    public readonly provide: Provider = (method, path, params) => this.implementation(method, Object.keys(params).reduce((acc, key) => acc.replace(`:${key}`, params[key]), path), Object.keys(params).reduce((acc, key) => path.indexOf(`:${key}`) >= 0 ? acc : { ...acc, [key]: params[key] }, {}));
}