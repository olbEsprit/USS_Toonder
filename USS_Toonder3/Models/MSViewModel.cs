using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace USS_Toonder.Models
{
    public class MSViewModel
    {
        [JsonProperty("ver")]
        public string Ver { get; set; }

        [JsonProperty("iss")]
        public string Iss { get; set; }

        [JsonProperty("sub")]
        public string Sub { get; set; }

        [JsonProperty("aud")]
        public Guid Aud { get; set; }

        [JsonProperty("exp")]
        public long Exp { get; set; }

        [JsonProperty("iat")]
        public long Iat { get; set; }

        [JsonProperty("nbf")]
        public long Nbf { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("preferred_username")]
        public string PreferredUsername { get; set; }

        [JsonProperty("oid")]
        public Guid Oid { get; set; }

        [JsonProperty("tid")]
        public Guid Tid { get; set; }

        [JsonProperty("nonce")]
        public Guid Nonce { get; set; }

        [JsonProperty("aio")]
        public string Aio { get; set; }
    }
}
