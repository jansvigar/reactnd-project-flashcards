const DeckDetail = require("./DeckDetail")
// @ponicode
describe("componentDidMount", () => {
    let inst

    beforeEach(() => {
        inst = new DeckDetail.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.componentDidMount()
        }
    
        expect(callFunction).not.toThrow()
    })
})
