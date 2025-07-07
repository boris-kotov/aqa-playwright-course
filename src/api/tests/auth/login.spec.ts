import { test, expect } from "@playwright/test";
import { apiConfig } from "config/api-config";
import { USER_LOGIN, USER_PASSWORD } from "config/environment";
import { loginSchema } from "data/schemas/auth/login.schema";
import { STATUS_CODES } from "data/statusCodes";
import { validateSchema } from "utils/validations/schemaValidation";

test.describe("[API] [Auth] [Login]", () => {
  let token = "";

  test("Should successfully login", async ({ request }) => {
    const loginResponse = await request.post(apiConfig.BASE_URL + apiConfig.ENDPOINTS.LOGIN, {
      data: { username: USER_LOGIN, password: USER_PASSWORD },
      headers: { "content-type": "application/json" },
    });

    const headers = loginResponse.headers();
    token = headers["authorization"];
    const loginBody = await loginResponse.json();
    const expectedUser = {
      _id: "68196484d006ba3d4760a076",
      username: "Kamposter",
      firstName: "Barys",
      lastName: "Kotau",
      roles: ["USER"],
      createdOn: "2025/05/06 01:23:16",
    };

    validateSchema(loginSchema, loginBody);
    expect.soft(loginResponse.status()).toBe(STATUS_CODES.OK);
    expect.soft(token).toBeTruthy();
    expect.soft(loginBody.User).toMatchObject(expectedUser);
    expect.soft(loginBody.ErrorMessage).toBe(null);
    expect.soft(loginBody.IsSuccess).toBe(true);
  });
});

/*
Write Smoke API test for Login:
  - create and validate Schema
  - Validate status
  - Check for token presence in headers
*/
