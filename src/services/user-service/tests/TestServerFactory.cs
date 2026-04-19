// TestServerFactory for integration testing with ASP.NET Core
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Hosting;

namespace UserService.Tests
{
    public class TestServerFactory : WebApplicationFactory<UserService.Api.Startup>
    {
        protected override IHostBuilder CreateHostBuilder()
        {
            return Host.CreateDefaultBuilder()
                .ConfigureWebHostDefaults(builder =>
                {
                    builder.UseStartup<UserService.Api.Startup>();
                });
        }
    }
}
