using System.Net.WebSockets;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();

// builder.Services.AddSingleton<WebSocketList>(); 

var app = builder.Build();

app.UseCors(p => 
    p.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin()
);
app.UseWebSockets();

var webSocketList = new List<WebSocket>();


app.Use(async (context, next) =>
    {
        if (context.Request.Path == "/ws")
        {
            if (context.WebSockets.IsWebSocketRequest)
            {
                using var webSocket = await context.WebSockets.AcceptWebSocketAsync();
                webSocketList.Add(webSocket); //Add the socket to the list.
                Console.WriteLine("Websocket connection created");
                await HandleWebSocketConnection(webSocket, webSocketList);
                // await Echo(webSocket);
                Console.WriteLine("Websocket connection closed");
            }
            else
            {
                context.Response.StatusCode = StatusCodes.Status400BadRequest;
            }
        }
        else
        {
            await next(context);
        }

    });
app.MapGet("/", () => "Hello World!");

app.Run();


static async Task Echo(WebSocket webSocket)
{
    var buffer = new byte[1024 * 4];
    var receiveResult = await webSocket.ReceiveAsync(
        new ArraySegment<byte>(buffer), CancellationToken.None);

    while (!receiveResult.CloseStatus.HasValue)
    {
        //added these three lines
        string bufferAsString = Encoding.ASCII.GetString(buffer);
        Console.WriteLine(bufferAsString);

        Console.WriteLine(receiveResult);

        await webSocket.SendAsync(
            new ArraySegment<byte>(buffer, 0, receiveResult.Count),
            receiveResult.MessageType,
            receiveResult.EndOfMessage,
            CancellationToken.None);

        receiveResult = await webSocket.ReceiveAsync(
            new ArraySegment<byte>(buffer), CancellationToken.None);
    }

    await webSocket.CloseAsync(
        receiveResult.CloseStatus.Value,
        receiveResult.CloseStatusDescription,
        CancellationToken.None);
}



async Task HandleWebSocketConnection(WebSocket webSocket, List<WebSocket> connections)
{
    var buffer = new byte[1024 * 4];
 
    try
    {
        while (webSocket.State == WebSocketState.Open)
        {
            var result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
 
            if (result.CloseStatus.HasValue)
                break;
 
            foreach (var client in connections.Where(c => c.State == WebSocketState.Open))
            {
                await client.SendAsync(new ArraySegment<byte>(buffer, 0, result.Count), result.MessageType, result.EndOfMessage, CancellationToken.None);
            }
        }
    }
    finally
    {
        connections.Remove(webSocket);
        await webSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Closed by server", CancellationToken.None);
    }
}
