const glob = require("glob-all");

describe("Checking generated html file", () => {
    it("Should generate html file", (done) => {
        const files = glob.sync([
            './dist/index.html',
            './dist/search.html'
        ])

        if (files.length > 0) {
            done()
        } else {
            throw new Error("NO HTML ")
        }
    })
})