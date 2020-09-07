use super::{
    handlers::{github_redirect, health_check},
    State,
};
use tide::Server;

pub fn add_routes(mut app: Server<State>) -> Server<State> {
    app.at("/healthz").get(health_check);
    app.at("/auth/github/redirect").get(github_redirect);
    app
}
