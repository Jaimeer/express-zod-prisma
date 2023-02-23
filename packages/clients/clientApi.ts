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

type PostV1UsersCreateInput = {} & {
    name: string;
};

type PostV1UsersCreateResponse = {
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

type GetV1UsersUseridInput = {} & {
    userId: string;
};

type GetV1UsersUseridResponse = {
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

type PatchV1UsersUseridUpdateInput = {} & {
    userId: string;
    name: string;
};

type PatchV1UsersUseridUpdateResponse = {
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

type DeleteV1UsersUseridDeleteInput = {} & {
    userId: string;
};

type DeleteV1UsersUseridDeleteResponse = {
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

export type Path = "/v1" | "/v1/users" | "/v1/users/create" | "/v1/users/:userId" | "/v1/users/:userId/update" | "/v1/users/:userId/delete";

export type Method = "get" | "post" | "put" | "delete" | "patch";

export type MethodPath = `${Method} ${Path}`;

export interface Input extends Record<MethodPath, any> {
    "get /v1": GetV1Input;
    "get /v1/users": GetV1UsersInput;
    "post /v1/users/create": PostV1UsersCreateInput;
    "get /v1/users/:userId": GetV1UsersUseridInput;
    "patch /v1/users/:userId/update": PatchV1UsersUseridUpdateInput;
    "delete /v1/users/:userId/delete": DeleteV1UsersUseridDeleteInput;
}

export interface Response extends Record<MethodPath, any> {
    "get /v1": GetV1Response;
    "get /v1/users": GetV1UsersResponse;
    "post /v1/users/create": PostV1UsersCreateResponse;
    "get /v1/users/:userId": GetV1UsersUseridResponse;
    "patch /v1/users/:userId/update": PatchV1UsersUseridUpdateResponse;
    "delete /v1/users/:userId/delete": DeleteV1UsersUseridDeleteResponse;
}

export const jsonEndpoints = { "get /v1": true, "get /v1/users": true, "post /v1/users/create": true, "get /v1/users/:userId": true, "patch /v1/users/:userId/update": true, "delete /v1/users/:userId/delete": true };

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