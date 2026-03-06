use axum::Router;
use std::net::SocketAddr;
use tower_http::trace::TraceLayer;

#[tokio::main]
async fn main() {
    // Initialize tracing with default INFO level
    tracing_subscriber::fmt()
        .with_env_filter(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| tracing_subscriber::EnvFilter::new("info")),
        )
        .init();

    // Load environment variables from .env file
    dotenvy::dotenv().ok();

    // Build our application with web routes
    let app = Router::new()
        .merge(flessner_web::web_router())
        .layer(TraceLayer::new_for_http());

    // Get port from environment variable or default to 3000
    let port = std::env::var("PORT")
        .ok()
        .and_then(|p| p.parse::<u16>().ok())
        .unwrap_or(3000);

    // Run the server
    let addr = SocketAddr::from(([0, 0, 0, 0], port));
    tracing::info!("Starting flessner_web on {}", addr);

    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
