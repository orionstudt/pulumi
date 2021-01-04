﻿using System;
using System.Text.Json;
using Pulumi.X.Automation;
using Pulumi.X.Automation.Serialization;
using Xunit;

namespace Pulumi.Tests.X.Automation
{
    public class StackSettingsConfigValueJsonConverterTests
    {
        private static LocalSerializer Serializer = new LocalSerializer();

        [Fact]
        public void CanDeserializePlainString()
        {
            const string json = @"
{
    ""config"": {
        ""test"": ""plain""
    }  
}
";

            var settings = Serializer.DeserializeJson<StackSettings>(json);
            Assert.NotNull(settings?.Config);
            Assert.True(settings!.Config!.ContainsKey("test"));

            var value = settings.Config["test"];
            Assert.NotNull(value);
            Assert.Equal("plain", value.Value);
            Assert.False(value.IsSecure);
        }

        [Fact]
        public void CanDeserializeSecureString()
        {
            const string json = @"
{
    ""config"": {
        ""test"": {
            ""secure"": ""secret""
        }
    }  
}
";

            var settings = Serializer.DeserializeJson<StackSettings>(json);
            Assert.NotNull(settings?.Config);
            Assert.True(settings!.Config!.ContainsKey("test"));

            var value = settings.Config["test"];
            Assert.NotNull(value);
            Assert.Equal("secret", value.Value);
            Assert.True(value.IsSecure);
        }

        [Fact]
        public void CannotDeserializeObject()
        {
            const string json = @"
{
    ""config"": {
        ""value"": {
            ""test"": ""test"",
            ""nested"": {
                ""one"": 1,
                ""two"": true,
                ""three"": ""three""
            }
        }
    } 
}
";

            Assert.Throws<NotSupportedException>(
                () => Serializer.DeserializeJson<StackSettings>(json));
        }

        [Fact]
        public void SerializesPlainStringAsString()
        {
            var value = new StackSettingsConfigValue("test", false);
            var json = Serializer.SerializeJson(value);

            var element = JsonSerializer.Deserialize<JsonElement>(json);
            Assert.Equal(JsonValueKind.String, element.ValueKind);
            Assert.Equal("test", element.GetString());
        }

        [Fact]
        public void SerializesSecureStringAsObject()
        {
            var value = new StackSettingsConfigValue("secret", true);
            var json = Serializer.SerializeJson(value);

            var element = JsonSerializer.Deserialize<JsonElement>(json);
            Assert.Equal(JsonValueKind.Object, element.ValueKind);
            Assert.True(element.TryGetProperty("secure", out var secureProperty));
            Assert.Equal(JsonValueKind.String, secureProperty.ValueKind);
            Assert.Equal("secret", secureProperty.GetString());
        }
    }
}
