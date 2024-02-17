from multiprocessing import Process, Manager
import os
import tensorflow as tf


class TensorProcess(Process):
    def __init__(self, result_dict, us):
        super().__init__()
        self.result_dict = result_dict
        self.us = us

        os.environ["CUDA_DEVICE_ORDER"] = "PCI_BUS_ID"
        os.environ["CUDA_VISIBLE_DEVICES"] = "6"

    def run(self):
        try:
            gpus = tf.config.list_physical_devices('GPU')
            tf.config.set_logical_device_configuration(
                gpus[0],
                [tf.config.LogicalDeviceConfiguration(memory_limit=4096)])
            self.result_dict['result'] = self.us.analyze()
        except Exception as e:
            self.result_dict['error'] = str(e)
