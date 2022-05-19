const { Given, When, Then } = require("cucumber");
const openUrl = require("../support/action/openUrl");
const keyboardPress = require("../support/action/keyboardPress");
const waitFor = require("../support/action/waitFor");
const assert = require("assert");
Given(/^Empty ToDo list$/, async function () {
  await openUrl.call(
    this,
    "http://" + process.env.VUE_APP_TEST_API_URL.slice(1, -1) + ":8081"
  );
  await waitFor.call(this, 2);
});
When(
  /^I write "([^"]*)" to ([^"]*) and click to ([^"]*)$/,
  async function (text, input, button) {
    await this.page.waitForSelector("#" + input);
    const addButton = await this.page.$("#" + button);
    for (const value of [...text]) {
      await keyboardPress.call(this, value, "#" + input);
    }
    await waitFor.call(this, 1);
    await addButton.click();
    await waitFor.call(this, 2);
  }
);
Then(/^I should see "([^"]*)" item in ToDo list$/, async function (text) {
  const value = await this.page.$$eval("li", (e) => e[e.length - 1].innerHTML);
  assert.equal(value, text, "not same");
});
