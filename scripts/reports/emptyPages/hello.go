package main

import (
	"encoding/json"
)

func Main(args map[string]interface{}) map[string]interface{} {
	final := removeNils(args)
	out, err := json.Marshal(args)
	if err != nil {
		panic(err)
	}
	msg := make(map[string]string)
	msg["body"] = string(out)
	return msg
}

func removeNils(initialMap map[string]interface{}) map[string]interface{} {
	withoutNils := map[string]interface{}{}
	for key, value := range initialMap {
		_, ok := value.(map[string]interface{})
		if ok {
			value = removeNils(value.(map[string]interface{}))
			withoutNils[key] = value
			continue
		}
		if value != nil {
			withoutNils[key] = value
		}
	}
	return withoutNils
}
