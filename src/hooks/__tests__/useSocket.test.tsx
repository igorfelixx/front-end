import { renderHook } from "@testing-library/react";
import { useSocket } from "../useSocket";
import { io } from "socket.io-client";
import { act } from "react";

interface MockSocket {
  on: jest.Mock;
  emit: jest.Mock;
  off: jest.Mock;
  disconnect: jest.Mock;
}

jest.mock("socket.io-client", () => {
  const mockSocket = {
    on: jest.fn(),
    emit: jest.fn(),
    off: jest.fn(),
    disconnect: jest.fn(),
  };
  return {
    io: jest.fn(() => mockSocket),
  };
});

jest.mock("../useFormStorage", () => ({
  __esModule: true,
  default: () => ({
    formData: {
      name: "Test User",
      maxCalls: 1,
    },
  }),
}));

describe("useSocket Hook", () => {
  let mockSocket: MockSocket;

  beforeEach(() => {
    jest.clearAllMocks();
    mockSocket = (io as jest.Mock)() as MockSocket;
  });


  it("sets up socket event listeners", () => {
    renderHook(() => useSocket());

    expect(mockSocket.on).toHaveBeenCalledWith("connect", expect.any(Function));
    expect(mockSocket.on).toHaveBeenCalledWith(
      "USER_CONNECTED",
      expect.any(Function)
    );
    expect(mockSocket.on).toHaveBeenCalledWith(
      "NEW_CALL",
      expect.any(Function)
    );
    expect(mockSocket.on).toHaveBeenCalledWith(
      "CALL_ENDED",
      expect.any(Function)
    );
    expect(mockSocket.on).toHaveBeenCalledWith(
      "END_CALL_ERROR",
      expect.any(Function)
    );
    expect(mockSocket.on).toHaveBeenCalledWith(
      "CALLS_LIST",
      expect.any(Function)
    );
    expect(mockSocket.on).toHaveBeenCalledWith(
      "disconnect",
      expect.any(Function)
    );
  });

  it("handles new calls correctly", () => {
    const mockCall = {
      callId: "1",
      caller: "John Doe",
      media: "audio",
      service: "support",
      startDate: "2024-02-20",
    };

    const newCallHandler = mockSocket.on.mock.calls.find(
      ([eventName]: [string, unknown]) => eventName === "NEW_CALL"
    )?.[1];

    if (newCallHandler) {
      act(() => {
        newCallHandler(mockCall);
      });

      expect(mockSocket.emit).toHaveBeenCalledWith("NEW_CALL_ANSWERED", {
        callId: "1",
      });
    }
  });

  it("handles call ending", () => {
    const { result } = renderHook(() => useSocket());

    act(() => {
      result.current.endCall("1");
    });

    expect(mockSocket.emit).toHaveBeenCalledWith("END_CALL", { callId: "1" });
  });

  it("handles disconnection", () => {
    const { result } = renderHook(() => useSocket());

    act(() => {
      result.current.disconnect();
    });

    expect(mockSocket.emit).toHaveBeenCalledWith("USER_DISCONNECT");
    expect(mockSocket.disconnect).toHaveBeenCalled();
  });

  it("cleans up socket listeners on unmount", () => {
    const { unmount } = renderHook(() => useSocket());

    unmount();

    expect(mockSocket.off).toHaveBeenCalledWith("connect");
    expect(mockSocket.off).toHaveBeenCalledWith("USER_CONNECTED");
    expect(mockSocket.off).toHaveBeenCalledWith("NEW_CALL");
    expect(mockSocket.off).toHaveBeenCalledWith("CALL_ENDED");
    expect(mockSocket.off).toHaveBeenCalledWith("END_CALL_ERROR");
    expect(mockSocket.off).toHaveBeenCalledWith("CALLS_LIST");
    expect(mockSocket.off).toHaveBeenCalledWith("disconnect");
  });
});
