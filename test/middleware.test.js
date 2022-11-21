import middleware from "../middleware";

const validMockReq = () => {
    const req = {
        headers: {
            token: "secretpass"
        }
    }
    return req;
}

const invalidMockReq = () => {
    const req = {
        headers: {
            token: "someothervalue"
        }
    }
}


test('Shoulder return a valid response since the token is passed as secretpass', () => {
    const mockedReq = validMockReq();
    const mockRes = {};
    const mockedNext = jest.fn();

    middleware.validateToken(mockedReq, mockRes, mockedNext);

    expect(mockRes.statusCode).toBeUndefined();
    expect(mockRes.json).toBeUndefined();
})
