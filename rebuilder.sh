readonly script_dir=$(dirname $0)
readonly port=5000

cd "$script_dir"
fuser -k "$port/tcp" || true

source ./env/bin/activate
./env/bin/fastapi dev tarefaConnectBackend/backend/main.py --port $port > /dev/null 2>&1 &

cd "./tarefaConnectFrontend/app"
find src | entr -c npm run build