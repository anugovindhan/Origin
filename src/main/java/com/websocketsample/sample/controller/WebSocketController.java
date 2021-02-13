package com.websocketsample.sample.controller;
import com.websocketsample.sample.service.PushMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class WebSocketController {

    @Autowired
    private PushMessageService pushMessageService;

    @GetMapping("/notify")
    public String getNotification() throws InterruptedException {

        pushMessageService.getMessages();
        return "Notifications successfully sent to Angular!";
    }

}
