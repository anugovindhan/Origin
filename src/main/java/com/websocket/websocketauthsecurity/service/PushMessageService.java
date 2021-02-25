package com.websocket.websocketauthsecurity.service;

import com.websocket.websocketauthsecurity.security.TokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;

@Service
public class PushMessageService {

    @Autowired
    private SimpMessagingTemplate template;

    @Autowired
    private HttpSession session ;
    @Autowired
    private TokenProvider tokenProvider;

    public void getMessages()throws InterruptedException {

        String btkn = (String) session.getAttribute("tkn");
        Boolean valid = tokenProvider.validateToken(btkn);
        if(valid) {
            String[] strArray3 = {"Hi", "Hello", "How Are You", "Have A Nice Day", "Bye"};

            for (int i = 0; i < strArray3.length; i++) {
                Thread.sleep(3000);
                template.convertAndSend("/topic/notification", strArray3[i]);
            }
        }

    }
}
