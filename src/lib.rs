use axum::{
    body::Body,
    http::{header, StatusCode, Uri},
    response::{IntoResponse, Response},
    routing::*,
    Router,
};
use include_dir::{include_dir, Dir};

pub mod pages;

static STATIC_DIR: Dir = include_dir!("$CARGO_MANIFEST_DIR/static");

pub struct Environment {
    pub posthog_key: String,
    pub posthog_host: String,
}

impl Environment {
    pub fn new() -> Self {
        Self {
            posthog_key: std::env::var("POSTHOG_KEY").unwrap_or_default(),
            posthog_host: std::env::var("POSTHOG_HOST").unwrap_or_default(),
        }
    }
}

impl Default for Environment {
    fn default() -> Self {
        Self::new()
    }
}

async fn static_handler(uri: Uri) -> impl IntoResponse {
    let path = uri
        .path()
        .trim_start_matches('/')
        .trim_start_matches("static/");

    match STATIC_DIR.get_file(path) {
        Some(file) => {
            let mime = mime_guess::from_path(path).first_or_octet_stream();
            Response::builder()
                .status(StatusCode::OK)
                .header(header::CONTENT_TYPE, mime.as_ref())
                .body(Body::from(file.contents()))
                .unwrap()
        }
        None => Response::builder()
            .status(StatusCode::NOT_FOUND)
            .body(Body::from("Not found"))
            .unwrap(),
    }
}

/// Creates the web router with landing page routes
/// Static files are bundled into the binary
pub fn web_router() -> Router {
    Router::new()
        .route("/", get(pages::index))
        .route("/static/{*path}", get(static_handler))
}
