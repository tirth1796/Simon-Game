MyJSGame.res = {
    Final: "res/"+AppConstants.RESOURCE_FOLDER+"/SimonGame.plist",
    Final_png: "res/"+AppConstants.RESOURCE_FOLDER+"/SimonGame.png",
};

MyJSGame.res_locale = {
    en: MyJSGame.path + "res/locale/en.json",
    zh: MyJSGame.path + "res/locale/zh.json"
};


MyJSGame.g_resources = [];
for (var i in MyJSGame.res) {
    MyJSGame.res[i] = MyJSGame.path + MyJSGame.res[i];
    MyJSGame.g_resources.push(MyJSGame.res[i]);
}