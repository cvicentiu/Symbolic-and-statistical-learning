var ids = {"al" : "jvKVL9MUIuG", "ak" : "eqKLLTOvElH", "az" : "bdJFKLNsFqG", "ca" : "bdJKKTNnFiG",
           "co" : "coIHLPOtGnF", "ct" : "frLNKYPJLuF", "de" : "dfLJJTOuHkE", "fl" : "dfLLJROsHmE",
           "ga" : "jvKXL9MSIuG", "hi" : "fhKPIXPEIsE", "id" : "bdJHKLNqFqG", "il" : "kwKZJdNTJrF",
           "in" : "giJRK1PFJpH", "ia" : "iuLVJ7MRKvH", "ks" : "frLPKYPHLuF", "ky" : "dfLLJTOsHkE",
           "la" : "jlKXLbMSIsG", "me" : "iuIVLaMUJvE", "md" : "eqLNIYOGKtF", "ma" : "coIJLTOrGjF",
           "mi" : "ikLVJbMRKrH", "mn" : "coIKLROqGlF", "ms" : "fhLQK0PGLsF", "mo" : "bdKIIONsEqG",
           "mt" : "jlKYLdMRIqG", "ne" : "frKQI1PDIoE", "nv" : "dfIOKYOCJsG", "nh" : "eqLOIYOFKtF",
           "nj" : "ikLWJbMQKrH", "nm" : "fhLQK2PGLqF", "ny" : "bdKIIQNsEoG", "nc" : "frKQI3PDImE",
           "nd" : "bdJIKRNpFkG", "oh" : "iuIWLcMTJtE", "ok" : "kwL0KiN5LzH", "or" : "ikLWJdMQKpH",
           "pa" : "fhLQK4PGLoF", "ri" : "bdKIISNsEmG", "sc" : "gsKTLaPQLtF", "sd" : "coJLIYOCIrH",
           "tn" : "dfLOJTOpHkE", "tx" : "iuLYJ9MOKtH", "ut" : "fhLSK0PELsF", "vt" : "bdKKIONqEqG", 
           "va" : "jvK0LdMPIqG", "wa" : "frKSI1PBIoE", "dc" : "htITI3PGKoG", "wv" : "iuIYLaMRJvE",
           "wi" : "eqLQIYODKtF", "wy" : "coIMLTOoGjF"};

ids = {"ak" : "ijIRI2PHKoG", "al" : "deIFLQOuGlF", "az" : "ghLLKZPKLsF", "ar" : "jkLRJ8MUKtH",
       "ca" : "cnKDINNwEqG", "co" : "ghKLI0PHIoE", "ct" : "cnJDKONtFmG", "de" : "grLLK1PKLqF",
       "dc" : "juIRL9MXJvE", "fl" : "cnKDIPNwEoG", "ga" : "itJPJ7MWIwE", "hi" : "lwKWJ8NVJvF",
       "id" : "cdJELINiGiF", "il" : "ijIQI0PIKqG", "in" : "epLIJOOuHoE", "ia" : "deIGLKOtGrF",
       "ks" : "klKUL6MUIwG", "ky" : "grKMIUPGIuE", "la" : "fgKKLSOvElH", "me" : "jkLSJ4MTKxH",
       "md" : "deIGLMOtGpF", "ma" : "lmKWJaNVJtF", "mi" : "ijIQI2PIKoG", "mn" : "epLIJQOuHmE",
       "ms" : "grKMIWPGIsE", "mo" : "klKUL8MUIuG", "mt" : "cnJEKKNsFqG", "ne" : "deIGLOOtGnF",
       "nv" : "kvKULaMUIsG", "nh" : "jkLSJ6MTKvH", "nj" : "ghLMKXPJLuF", "nm" : "epLIJSOuHkE",
       "ny" : "grKMIYPGIqE", "nc" : "lmKWJcNVJrF", "nd" : "hsJOK0PHJpH", "oh" : "cnJEKMNsFoG",
       "ok" : "juISL7MWJxE", "or" : "hsJOK2PHJnH", "pa" : "deIGLQOtGlF", "ri" : "jkLSJ8MTKtH",
       "sc" : "ghLMKZPJLsF", "sd" : "cnKEINNvEqG", "tn" : "kvKULcMUIqG", "tx" : "cnJEKONsFmG",
       "ut" : "fgLKIXOIKtF", "vt" : "juLSJaMTKrH", "va" : "deIGLSOtGjF", "wa" : "cnKEIPNvEoG",
       "wv" : "cnJEKQNsFkG", "wi" : "ghKMI2PGImE", "wy" : "jkISLbMWJtE"};


function get_state(abbreviation) {
  var abbr = abbreviation.toLowerCase();
  if(abbr == "usa") {
    site = "http://action.mpp.org";
  } else if(typeof(ids[abbr]) != "undefined") {
    site = "http://www.kintera.org/site/lookup.asp?c=" + ids[abbr];
  } else {
    alert("Error: unknown state: \"" + abbreviation + "\"");
  }
  return site;
}
