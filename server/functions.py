def is_empty(text, minimum=0):
    # minimum is the minimum of characters specified
    # to validate the input as empty if len(text) >= minimum)
    return False if (text and 
        isinstance(text, str) and not 
        text.isspace() and 
        len(text) >= minimum) else True
