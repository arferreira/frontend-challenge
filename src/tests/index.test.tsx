import { render } from "@testing-library/react";
import { expect, it, jest } from "@jest/globals";
import Home from "../pages/index";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));

jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual("next-auth/react");
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { username: "admin" },
  };
  return {
    __esModule: true,
    originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: "authenticated" }; // return type is [] in v3 but changed to {} in v4
    }),
  };
});

//mock use toast
jest.mock("~/providers/ToastProvider", () => ({
  useToast: () => {
    return {
      showToast: jest.fn(),
    };
  },
}));

void it("renders index page unchanged", () => {
  const { container } = render(<Home />);
  expect(container).toMatchSnapshot();
});
