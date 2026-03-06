use crate::Environment;
use askama::Template;
use axum::response::*;

#[derive(Template)]
#[template(path = "index.html")]
struct Index {
    env: Environment,
}

impl Index {
    fn new() -> Self {
        Self {
            env: Environment::new(),
        }
    }
}

pub async fn index() -> impl IntoResponse {
    let template = Index::new();
    Html(template.render().unwrap())
}
