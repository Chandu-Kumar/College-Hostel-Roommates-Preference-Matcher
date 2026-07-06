try:
    from fastapi import FastAPI  # type: ignore
except Exception:
    # Minimal fallback when fastapi isn't installed (useful for linting/IDE warnings)
    class FastAPI:
        def __init__(self, **kwargs):
            self._routes = {}

        def get(self, path):
            def decorator(func):
                self._routes[path] = func
                return func
            return decorator

        def __call__(self, scope, receive, send):
            async def app(scope, receive, send):
                if scope.get("type") != "http":
                    await send({"type": "http.response.start", "status": 500, "headers": []})
                    await send({"type": "http.response.body", "body": b"Unsupported scope"})
                    return
                path = scope.get("path", "/")
                handler = self._routes.get(path)
                if not handler:
                    await send({"type": "http.response.start", "status": 404, "headers": []})
                    await send({"type": "http.response.body", "body": b"Not Found"})
                    return
                result = handler()
                body = (str(result)).encode()
                await send({"type": "http.response.start", "status": 200, "headers": [(b"content-type", b"application/json")]})
                await send({"type": "http.response.body", "body": body})

            return app(scope, receive, send)


app = FastAPI(title="Hostel Matcher API")


@app.get("/")
def home():
    return {"message": "Hostel Matcher Backend Running 🚀"}