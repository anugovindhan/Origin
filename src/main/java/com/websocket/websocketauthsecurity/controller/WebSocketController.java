package com.websocket.websocketauthsecurity.controller;

import com.websocket.websocketauthsecurity.security.TokenProvider;
import com.websocket.websocketauthsecurity.service.PushMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;


@RestController
@RequestMapping("/api")
public class WebSocketController {

    @Autowired
    private HttpSession session ;
    @Autowired
    private TokenProvider tokenProvider;
    @Autowired
    private PushMessageService pushMessageService;


    @GetMapping("/notify")
    public String getNotification(HttpServletRequest request) throws InterruptedException {

        Boolean valid = tokenProvider.validateToken(request.getHeader("Authorization").split(" ")[1]);

        if(valid) {

            pushMessageService.getMessages();
            return "Notifications successfully sent to Angular!";

        }else {

            return "Token Ivalid";

        }

    }

}


