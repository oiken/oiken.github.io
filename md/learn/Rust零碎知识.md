#### 可以配置 linter clippy 来拒绝使用 unwrap（或 expect）的代码！如果你将此添加到 Cargo.toml 文件中，它将拒绝任何使用 unwrap 的代码。
```toml
[lints.clippy]
unwrap_used = "deny"
```