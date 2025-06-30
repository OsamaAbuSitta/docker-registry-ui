using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Net.Http.Json;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;

services.AddEndpointsApiExplorer();
services.AddSwaggerGen();
services.AddHttpClient();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

var registryUrl = builder.Configuration["REGISTRY_URL"] ?? "http://localhost:5000";
var singleRegistry = builder.Configuration.GetValue("SINGLE_REGISTRY", true);

app.MapGet("/api/repositories", async (HttpClient http) =>
{
    var catalog = await http.GetFromJsonAsync<Catalog>($"{registryUrl}/v2/_catalog");
    return Results.Json(catalog ?? new Catalog());
});

app.MapGet("/api/repositories/{name}/tags", async (HttpClient http, string name) =>
{
    var tags = await http.GetFromJsonAsync<TagList>($"{registryUrl}/v2/{name}/tags/list");
    return Results.Json(tags ?? new TagList());
});

app.MapGet("/api/repositories/{name}/tags/{tag}", async (HttpClient http, string name, string tag) =>
{
    using var request = new HttpRequestMessage(HttpMethod.Get, $"{registryUrl}/v2/{name}/manifests/{tag}");
    request.Headers.Add("Accept", "application/vnd.docker.distribution.manifest.v2+json");
    var response = await http.SendAsync(request);
    var manifestJson = await response.Content.ReadAsStringAsync();
    return Results.Content(manifestJson, "application/json");
});

app.Run();

record Catalog(string[] repositories = null!);
record TagList(string name = null!, string[] tags = null!);
