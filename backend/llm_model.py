from transformers import AutoModelForCausalLM, AutoTokenizer

model_name = "hanane22/falcon-1b-instruct-ft"  
token = "hf_TkPTOHxCJCIOrPQEat¡¡aGDHeZeAtZjve"  

model = AutoModelForCausalLM.from_pretrained(model_name, use_auth_token=token)
tokenizer = AutoTokenizer.from_pretrained(model_name, use_auth_token=token, trust_remote_code=True)























