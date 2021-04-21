package in.chandanpal.loginregisterjwtmysql.service;

import java.util.HashMap;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class CommonServices
{
    @GetMapping("/test")
    public ResponseEntity<?> testAuthentication() {
        HashMap<String, String> responseMap = new HashMap<>();
        responseMap.put("message", "You are Authenticated!");
        return ResponseEntity.ok(responseMap);
    }

}
