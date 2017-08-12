jar.hta 是 JSVM2 下的一个打包工具. 也是基于jsvm2开发的。

能将一组多个类文件(.jsc文件)导出到一个lib文件中 (lib文件的扩展名推荐用.js)。
导出后的lib文件，可以配置到jsvm的classpath中。
jsvm在初始化的时候会自动加载这个lib，以后使用这些类的时候，jsvm 就不需要去逐一加载每一个.jsc文件了。
这种预先批量加载的方式，可以提高系统综合性能。尤其是当jsvm在application模式下工作的时候。

打包步骤：

1. 将类拷贝到jsvm2/classes中（保证包结构和目录结构层次的一致性）
2. 运行 jar.hta
3. 在资源树上选择要导出的类文件（记住：只能导出.jsc文件，其他被选中的资源文件都将会被忽略）
4. 填写 名称，作者，以及导出的路径
5. 点击 导出 按钮，即操作完毕。

部署 lib 文件:

<script src=<jsvm_home>/jsre.js classpath="<lib文件路径>" ></script>

如果lib文件放在 <jsvm_home>/lib 中，则只需填写相对路径既可.
多个lib文件用分号;分隔。例如：classpath="lib文件路径1;lib文件路径2" 
