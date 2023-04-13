package com.craypas.abusecounting.util;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class Abuse implements Serializable {
    private int no;
    private String word;
}
